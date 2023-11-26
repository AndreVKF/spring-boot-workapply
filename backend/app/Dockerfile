FROM eclipse-temurin:17-jdk-alpine

COPY . .

EXPOSE 8080

COPY /target/app-1.0.0.jar app.jar

ENTRYPOINT [ "java", "-jar", "app.jar" ]