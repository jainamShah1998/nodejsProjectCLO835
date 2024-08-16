# Full-Stack Application Deployment and Management on Kubernetes

## Objective
This project demonstrates the deployment of a full-stack application on a Kubernetes cluster. The application includes three main components:

- **Node.js Backend**: Acts as the API server interacting with a MongoDB database.
- **MongoDB Database**: Stores and retrieves data serving as the backend data layer.
- **Nginx Frontend**: Serves static content (such as HTML, CSS, and JavaScript) and acts as a reverse proxy to route requests to the backend.

This project provides hands-on experience with containerization using Docker, orchestration with Kubernetes, environment management with ConfigMaps, and data persistence with Persistent Volumes.

## Prerequisites
- Docker installed and configured.
- Kubernetes cluster set up (e.g., Minikube).
- kubectl configured to interact with your Kubernetes cluster.
- A Docker Hub account to push Docker images.

## Project Setup and Deployment

### Step 1: Setup the Kubernetes Environment
1. Start Minikube or your preferred Kubernetes environment.
2. Create a namespace for the application:
    ```bash
    kubectl create namespace fullstack-app
    ```

### Step 2: Containerize the Application

#### Frontend (Nginx):
1. Navigate to the frontend directory:
    ```bash
    cd ./Frontend
    ```
2. Build the Docker image:
    ```bash
    docker build -t <your-dockerhub-username>/nginx-frontend .
    ```
3. Push the Docker image to Docker Hub:
    ```bash
    docker push <your-dockerhub-username>/nginx-frontend
    ```

#### Backend (Node.js):
1. Navigate to the backend directory:
    ```bash
    cd ./Backend
    ```
2. Build the Docker image:
    ```bash
    docker build -t <your-dockerhub-username>/node-backend .
    ```
3. Push the Docker image to Docker Hub:
    ```bash
    docker push <your-dockerhub-username>/node-backend
    ```

### Step 3: Deploy to Kubernetes

1. **Deploy ConfigMap**: Store environment variables such as the MongoDB URI.
    ```bash
    kubectl apply -f K8s/configMap.yaml -n fullstack-app
    ```

2. **Deploy Persistent Volume and Persistent Volume Claim**: Ensure data persistence for MongoDB.
    ```bash
    kubectl apply -f K8s/pv.yaml -n fullstack-app
    ```

3. **Deploy Secret**: Securely store sensitive data (like MongoDB credentials).
    ```bash
    kubectl apply -f K8s/secret.yaml -n fullstack-app
    ```

4. **Deploy MongoDB**:
    ```bash
    kubectl apply -f K8s/Mongodb/ -n fullstack-app
    ```

5. **Deploy Node.js Backend**:
    ```bash
    kubectl apply -f K8s/Nodejs/ -n fullstack-app
    ```

6. **Deploy Nginx Frontend**:
    ```bash
    kubectl apply -f K8s/Nginx/ -n fullstack-app
    ```

### Step 4: Verify Deployment

1. **Ensure all pods are running**:
    ```bash
    kubectl get pods -n fullstack-app
    ```

2. **Check the services**:
    ```bash
    kubectl get svc -n fullstack-app
    ```

3. **Access the frontend application**:
   - Get the Minikube IP:
        ```bash
        minikube ip
        ```
   - Access the application using:
        ```plaintext
        http://<minikube-ip>:<nginx-node-port>
        ```

### Step 5: Interact with the Application

1. **Connect Node.js Backend to MongoDB**:
    ```bash
    kubectl port-forward svc/node-backend-svc -n fullstack-app 3000:3000
    ```

2. **View Logs of the Node.js Application**:
    ```bash
    kubectl logs node-backend-deployment-<pod-id> -n fullstack-app
    ```
