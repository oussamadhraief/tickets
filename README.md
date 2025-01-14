
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
   - Appliquer les manifestes Kubernetes :
     ```bash
     kubectl apply -f kubernetes/
     ```

4. **Déployer le pipeline Jenkins :**
   - Configurer le **Jenkinsfile** pour le pipeline CI/CD.

5. **Configurer Prometheus et Grafana :**
   - Appliquer les fichiers de configuration dans le cluster :
     ```bash
     kubectl apply -f monitoring/
     ```

---

## Auteurs
- **Oussama Dhraief**
- Mini-projet réalisé dans le cadre du cours de **DevOps 2024-25** avec Dr. Salah Gontara.
