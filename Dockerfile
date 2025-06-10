# 构建阶段
FROM maven:3.8.6-openjdk-8-slim AS build
WORKDIR /app

# 1. 先只复制 pom.xml（依赖变化较少）
COPY pom.xml .
COPY backend/pom.xml ./backend/
# 复制所有子模块的pom.xml文件（如果有多级子模块）
# COPY */*/pom.xml ./

# 2. 使用 BuildKit 缓存 Maven 依赖
RUN --mount=type=cache,target=/root/.m2 mvn dependency:go-offline -B
# RUN mvn dependency:go-offline -B

# 3. 复制源代码并构建（利用缓存，仅当源码变化时才重新构建）
COPY backend/src ./backend/src/
RUN --mount=type=cache,target=/root/.m2 mvn clean package -DskipTests
#RUN mvn clean package -DskipTests

# 运行阶段
FROM openjdk:8-jdk-slim
WORKDIR /app
COPY --from=build /app/backend/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=dev"]