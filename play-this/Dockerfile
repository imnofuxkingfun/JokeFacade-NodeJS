FROM postgres:16-alpine

VOLUME ["/var/lib/postgresql/data"]

EXPOSE 5432

HEALTHCHECK --interval=10s --timeout=5s --retries=5 CMD pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB"
