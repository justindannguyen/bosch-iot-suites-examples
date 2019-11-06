FROM openjdk:8-jre
LABEL maintainer Justin Nguyen <justin.dan.nguyen@gmail.com>
EXPOSE 80
ENTRYPOINT ["java", "-jar", "/usr/share/justin.jar"]

ARG JAR_FILE
ADD target/xdk-api-1.0.0.jar /usr/share/justin.jar