# End_of_semester_Project

How to run the application? 
1.	Build the image locally : 
docker-compose build

2.	Start a swarm using: 
docker swarm init

3.	Build the stack and deploy using:
docker stack deploy -c docker-compose.yml myApp
==> The server will be running under: http://127.0.0.1:5000
==> Grafana : http://127.0.0.1:3000

4.	To make nodes join the swarm created: 
 docker swarm join -t [token]
