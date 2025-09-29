# giftr

## Description
My bored christmas-time codings.

## Visuals
TBA

## Dev Installation
### Docker Workflow (Recommended)
1. Clone the repository
```
# example with HTTPS
git clone https://gitlab.com/collaboration6171034/employee-portal.git
```

2. Run with Docker Compose (Can also use Docker Desktop's GUI)
```
# in /employee-portal/ directory
docker compose -f docker-compose.dev.yml up -d
```

3. Open [localhost:3000](http://localhost:3000) to access the application. Access backend through [localhost:8000](http://localhost:8000)

4. Create superuser account
```
# gain access to backend container
docker compose -f docker-compose.dev.yml down

# run createsuperuser script
python manage.py createsuperuser

# ... follow prompt ...

# exit the container
exit
```

5. Shutdown containers when done
```
# in /employee-portal/ directory
docker compose -f docker-compose.dev.yml down
```

6. [Optional] Set up Email Support
```
# add to /employee-portal/backend/.env (create this file)
EMAIL_HOST=[add your email host]
EMAIL_HOST_USER=[add specific email address]
EMAIL_HOST_PASSWORD=[add password for above user]

# remember to restart the backend container
```

### Other helpful commands
- If you need terminal access in one of the containers
```
# in /employee-portal/ directory
docker compose -f docker-compose.dev.yml exec -i [service] bash
```
- To run tests
```
# in frontend container
npm run test
npm run lint

# in backend container
coverage run manage.py test
coverage html

# open employee-portal/backend/htmlcov/index.html for coverage report
```

## Set up Production and/or Staging Environment

### Basic Server Setup 

1. install docker and docker compose
```
sudo apt update
sudo apt install docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker
```

2. install certbot 
```
sudo apt update
sudo apt install certbot python3-certbot-nginx
```

3. install and configure firewall
```
sudo apt update
sudo apt install ufw

sudo ufw allow OpenSSH      
sudo ufw allow 80         
sudo ufw allow 443           
sudo ufw enable       
```

4. install nginx, get ssl certs, delete default config
```
sudo apt update
sudo apt install nginx

sudo certbot --nginx -d portal.americantechnologydevelopment.org
# might need to restart nginx first

sudo rm /etc/nginx/sites-available/default
sudo rm /etc/nginx/sites-enabled/default
```

5. ssl certs auto renew before expiration, test renewal
```
sudo certbot renew --dry-run
```

### CI User Setup

1. create an email for portal

2. set up new user
```
sudo adduser portal
```
 
3. give sudo privileges
```
sudo usermod -aG sudo portal
```

### Configure SSH for User

1. create ssh keys on local machine (using bash on windows)
```
ssh-keygen -t rsa -b 4096 -C "portal@americantechnologydevelopment.org" -f ~/.ssh/portal_key
```

2. copy public key
```
cat ~/.ssh/portal_key.pub | clip
```

3. setup ssh files on virtual Server
```
sudo mkdir /home/portal/.ssh
sudo chown -R portal /home/portal/.ssh
sudo chmod 700 /home/portal/.ssh

sudo touch /home/portal/.ssh/authorized_keys
sudo chmod 600 /home/portal/.ssh/authorized_keys
```

4. copy public key into authorized_keys
```
sudo nano /home/portal/.ssh/authorized_keys
# paste public key on first line
```

5. configure sudo privileges for ssh
```
sudo visudo

# add this line to the bottom of sudoers file and save
portal ALL=(ALL) NOPASSWD: /usr/bin/docker, /usr/local/bin/docker-compose
```

6. test ssh (from local machine)
```
ssh -i ~/.ssh/portal_key portal@ip
# should connect to server without prompting for pw
```

### Project and Nginx Setup

1. create directory for project at /
```
sudo mkdir /portal
```

2. change ownership to portal
```
sudo chown -R portal /portal
```

3. add or copy .env file
```
# to add
sudo touch /portal/.env

# to copy from local machine
scp -i ~/.ssh/portal_key /path/to/.env portal@ip:/portal/
```

4. ensure these vars are in .env
    - DB_NAME
    - DB_USER
    - DB_PASSWORD
    - SECRET_KEY
    - WEB_URL
    - ALLOWED_HOSTS
    - CSRF_TRUSTED_ORIGINS
    - CORS_ALLOWED_ORIGINS
    - EMAIL_HOST
    - EMAIL_HOST_USER
    - EMAIL_HOST_PASSWORD

5. add conf file for nginx and set portal as owner
```
sudo touch /etc/nginx/sites-available/portal.conf
sudo chown portal /etc/nginx/sites-available/portal.conf
```

6. enable conf file
```
sudo ln -s /etc/nginx/sites-available/portal.conf /etc/nginx/sites-enabled/
```


### GitLab Setup

1. copy private key in base64 with no whitespace (local computer)
```
cat ~/.ssh/portal_key | base64 | tr -d '\n' | clip
```

2. add following CI/CD vars to GitLab (Settings>CI/CD>Variables)
    - PROD_IP
    - SSH_PRIVATE_KEY_BASE64 (protected, masked, hidden)

3. edit any necessary variables or docker registries in .gitlab-ci.yml, docker-compose.yml, or portal.conf

4. go to latest deploy_production job and rerun it

### Final Virtual Server Configuration

1. test and restart nginx conf
```
sudo nginx -t
sudo systemctl restart nginx
```

2. add first user to database
```
cd /portal
sudo docker compose exec -it backend bash
python manage.py createsuperuser
```

### Considerations and Improvements

- here is a template for how to restrict the commands an account using ssh access can use (prepend to key in authorized_keys)
```
command="sudo -l && exec bash",no-port-forwarding,no-X11-forwarding,no-agent-forwarding,no-pty ssh-rsa AAAAB3NzaC1yc2... user@example.com
```

- ensure unique ports are used for every service that you might want to serve with nginx. this application uses port 3001 for frontend and 8001 for backend

- might be able to move some of variables from .gitlab-ci.yml to gitlab, if it makes sense

- I commented out script for a potention staging stage in the pipeline. If you want to set up staging before actual deployment, feel free to look there
    
## Links
- [ER Diagram](https://dbdiagram.io/d/ATI-ERP-66dcb9ceeef7e08f0e01cbf0)
