FROM golang:1.24.2

WORKDIR /app

COPY go.mod go.sum main.go ./
COPY controllers/ ./controllers/
COPY models/ ./models/
COPY routes/ ./routes/

RUN addgroup --system nonroot && adduser --system --group nonroot
RUN chown -R nonroot:nonroot /app
USER nonroot

ENV GOPATH=/tmp/go
ENV GOCACHE=/tmp/go/cache

RUN go mod tidy
CMD ["go", "run", "main.go"]
