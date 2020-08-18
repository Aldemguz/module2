FROM openjdk:11-jre

ENTRYPOINT ["java", "-jar", "/opt/content-filter/content-filter.jar", "--spring.config.location=classpath:/application.properties,file:/opt/content-filter/content-filter/application.properties"]

ARG JAR_FILE
ADD target/${JAR_FILE} /opt/content-filter/content-filter.jar

RUN mkdir -p /opt/content-filter/logs/