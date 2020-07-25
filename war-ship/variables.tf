variable "region" {
   type = string
   description = "Region where we will create our resources"
   default     = "us-east-1"
}

#Availability zones
variable "azs" {
  type = list(string)
  description = "Availability zones"
  default = ["us-east-1a","us-east-1b"]
}

variable "ecs_cluster" {
    type = string
    description = "Name of the ecs cluster"
    default = "war-ship"
}

variable "ssh_key_name" {
  description = "SSH key to use to enter and manage the EC2 instances within the cluster. Optional"
  default     = ""
}
variable "instance_type_spot" {
  default = "t3a.medium"
}

variable "min_spot_instances" {
  default     = "1"
  description = "The minimum EC2 spot instances to have available within the cluster when the cluster receives less traffic"
}
variable "max_spot_instances" {
  default     = "5"
  description = "The maximum EC2 spot instances that can be launched during period of high traffic"
}