FROM node:22 as BASE

# Set non-interactive mode for apt-get
ENV DEBIAN_FRONTEND=noninteractive

# Update package lists and install necessary packages
RUN apt-get update && \
    apt-get install -y \
    gcc \
    g++ \
    python3 \
    golang \
    mono-complete \
    openjdk-11-jdk \
    && apt-get clean && \
    rm -rf /var/lib/apt/lists/*


WORKDIR /api

COPY package*.json .
RUN node -v
RUN npm -v
RUN cat /etc/os-release
RUN curl -V
RUN gcc --version
RUN g++ --version
RUN python3 -V
RUN go version
RUN npm install

COPY . .

EXPOSE 3000

CMD npm start
