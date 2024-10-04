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
    && apt-get clean && \
    rm -rf /var/lib/apt/lists/*


WORKDIR /api

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD npm start
