# syntax=docker/dockerfile:1

# Build stage
FROM openjdk:24-jdk-slim AS build
WORKDIR /app
COPY pom.xml mvnw mvnw.cmd ./
COPY .mvn .mvn
RUN ./mvnw dependency:go-offline
COPY src ./src
RUN ./mvnw clean package

# Run stage
FROM openjdk:24-jdk-slim
WORKDIR /app

# Install DNS tools (libnss for SRV lookup, curl for optional debugging)
RUN apt-get update && \
    apt-get install -y libnss3 dnsutils curl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

COPY --from=build /app/target/todo-prod-service-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
