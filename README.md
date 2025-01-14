
# Mini-Projet DevOps: Conteneurisation et Déploiement d'une Application Web

## Introduction

Ce projet vise à conteneuriser et déployer une application web existante sur un cluster Kubernetes local, tout en mettant en place un système de monitoring avancé avec Prometheus et Grafana. 

---

## Objectifs

- Conteneurisation de l'application web à l'aide de **Docker**.
- Déploiement de l'application sur un cluster **Kubernetes** local (Minikube, Kind, ou k3s).
- Mise en œuvre de l'intégration continue avec **Jenkins**.
- Surveillance et observabilité de l'application avec **Prometheus** et **Grafana**.
- (Optionnel) Déploiement sur un cluster managé (AKS ou EKS).

---

## Contenu du Projet

### 1. Application Web
- Application développée en architecture MVC ou microservices.
- Compatible avec Docker pour la conteneurisation.

### 2. Conteneurisation
- **Dockerfiles** pour chaque composant/service.
- **docker-compose.yml** pour tester l'application en local.

### 3. Intégration Continue
- Utilisation d'un **pipeline Jenkins** pour :
  - Construction des images Docker.
  - Scan des vulnérabilités avec **Trivy**.
  - Push des images vers **Docker Hub**.

### 4. Déploiement sur Kubernetes
- Configuration d'un cluster local avec Minikube ou Kind.
- Manifestes Kubernetes incluant **Deployments**, **Services**, et **ConfigMaps**.
- Utilisation de **Helm Charts** pour faciliter le déploiement.
- Gestion GitOps via **ArgoCD**.

### 5. Monitoring
- **Prometheus** pour collecter les métriques.
- **Grafana** pour visualiser les métriques sur des tableaux de bord personnalisés.

---

## Installation et Déploiement

### Prérequis
- Docker et Docker Compose installés.
- Kubernetes local (Minikube ou Kind).
- Jenkins configuré.
- Outils de monitoring (Prometheus, Grafana).

### Étapes
1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/oussamadhraief/tickets.git
   cd tickets
   ```

2. **Configurer Docker Compose :**
   ```bash
   docker-compose up
   ```

3. **Configurer le cluster Kubernetes :**
   - Créer un cluster local avec Minikube :
     ```bash
     minikube start
     ```
   - Appliquer les manifestes Kubernetes pour le frontend :
     ```bash
     kubectl apply -f frontend-deployment.yaml
     kubectl apply -f frontend-service.yaml
     ```
   - Appliquer les manifestes Kubernetes pour le backend :
     ```bash
     kubectl apply -f backend-deployment.yaml
     kubectl apply -f backend-service.yaml
     ```

4. **Déployer le pipeline Jenkins :**
   - Configurer le **Jenkinsfile** pour le pipeline CI/CD.

5. **Configurer Prometheus et Grafana :**
   - Appliquer les fichiers de configuration dans le cluster :
     ```bash
     kubectl apply -f monitoring/
     ```

6. **Démarrage et Visualisation**
   - Démarrer Minikube et préparer l'environnement :
     ```bash
     minikube start
     docker restart $(docker ps -a -q)
     ```
   - Configurer le port forwarding pour les différents services :
     - **Prometheus (Monitoring)** :
       ```bash
       kubectl port-forward -n monitoring prometheus-server-dc8d896f6-j4j6w 9090:9090
       ```
     - **Node Exporter (Metrics)** :
       ```bash
       kubectl port-forward prometheus-prometheus-node-exporter-t9jj6 9100:9100 -n default
       ```
     - **Grafana (Visualisation)** :
       ```bash
       kubectl port-forward svc/grafana 3000:80 -n default
       ```
     - **Alertmanager** :
       ```bash
       kubectl port-forward -n monitoring prometheus-alertmanager-0 9093:9093
       ```
     - **Pushgateway** :
       ```bash
       kubectl port-forward -n monitoring prometheus-prometheus-pushgateway-67d658d945-rpcsz 9091:9091
       ```
     - **Prometheus (Service)** :
       ```bash
       kubectl port-forward svc/prometheus-service 9090:9090 -n monitoring &
       ```
     - **Grafana (Service)** :
       ```bash
       kubectl port-forward svc/grafana-service 3000:3000 -n monitoring &
       ```
     - **ArgoCD (GitOps Management)** :
       ```bash
       kubectl port-forward svc/argocd-server -n argocd 8081:443
       ```

---

### Système d'exploitation
- Ce projet a été créé et testé sur **Ubuntu** pour garantir la compatibilité avec les outils utilisés.

---

## Auteurs
- **Oussama Dhraief**
- Mini-projet réalisé dans le cadre du cours de **DevOps 2024-25** avec Dr. Salah Gontara.
