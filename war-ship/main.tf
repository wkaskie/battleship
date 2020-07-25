provider "aws" {
 profile    = "default"
 region     = var.region
}

# module "vpc" {
#   source = "terraform-aws-modules/vpc/aws"

#   name = "war-ship-vpc"
#   cidr = "10.0.0.0/16"

#   azs             = var.azs
#   private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
#   public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]

#   enable_nat_gateway = true

#   tags = {
#     Terraform = "true"
#     Environment = "dev"
#   }
# }

resource "aws_ecr_repository" "war_ship" {
  name = "war-ship"
}


# module "ecr_image" {
#   source = "github.com/byu-oit/terraform-aws-ecr-image?ref=v1.0.1"
#   dockerfile_dir = "."
#   ecr_repository_url = module.ecr.repository.repository_url
# }

resource "aws_ecs_cluster" "war_ship_cluster" {
  name="war-ship-cluster"
}

# module "aws_ecs_cluster" {
#   source = "anrim/ecs/aws//modules/cluster"

#   name = "war-ship-cluster"
#   vpc_id      = module.vpc.vpc_id
#   vpc_subnets = [module.vpc.private_subnets]
#   tags        = {
#     "Environment" = "dev"
#     "Owner" = "me"
#   }
# }

resource "aws_ecs_task_definition" "launch_web_app" {
  family                   = "launch-web-app" # Naming our first task
  container_definitions    = <<DEFINITION
  [
    {
      "name": "launch-web-app",
      "image": "${aws_ecr_repository.war_ship.repository_url}",
      "essential": true,
      "environment": [
        {
          "name": "SECRET",
          "value": "I love cake"
        }
      ],
      "portMappings": [
        {
          "containerPort": 3030,
          "hostPort": 3030,
          "protocol": "tcp"
        }
      ],
      "memory": 512,
      "cpu": 256
    }
  ]
  DEFINITION
  requires_compatibilities = ["FARGATE"] # Stating that we are using ECS Fargate
  network_mode             = "awsvpc"    # Using awsvpc as our network mode as this is required for Fargate
  memory                   = 512         # Specifying the memory our container requires
  cpu                      = 256         # Specifying the CPU our container requires
  execution_role_arn       = aws_iam_role.ecsTaskExecutionRole.arn
}

resource "aws_iam_role" "ecsTaskExecutionRole" {
  name               = "ecsTaskExecutionRole"
  assume_role_policy = data.aws_iam_policy_document.assume_role_policy.json
}

data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "ecsTaskExecutionRole_policy" {
  role       = aws_iam_role.ecsTaskExecutionRole.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_ecs_service" "war_ship_service" {
  name            = "war-ship-service"                              # Name the service
  cluster         = aws_ecs_cluster.war_ship_cluster.id             # Referencing the created Cluster
  task_definition = aws_ecs_task_definition.launch_web_app.arn      # Referencing the task the service will spin up
  launch_type     = "FARGATE"
  desired_count   = 1 # Containers to deploy
  network_configuration  {
    assign_public_ip = true
    subnets = ["subnet-c9bf5a92 ", "subnet-3e70a477", "subnet-e8e502d4", "subnet-9e4b32fb", "subnet-137b141f", "subnet-f6d337db"]
    security_groups = ["sg-0c478a0989b10dc92"]
  }
}