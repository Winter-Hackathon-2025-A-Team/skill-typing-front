up:
	docker-compose up -d

install:
	docker-compose exec app bash -c "(cd skill-typing-front && npm install)"

dev:
	docker-compose exec app bash -c "(cd skill-typing-front && npm run dev)"

down:
	docker-compose down

lint:
	docker-compose exec app bash -c "(cd skill-typing-front && npm run lint)"

typecheck:
	docker-compose exec app bash -c "(cd skill-typing-front && npm run typecheck)"

format:
	docker-compose exec app bash -c "(cd skill-typing-front && npm run format)"

all-check:
	docker-compose exec app bash -c "(cd skill-typing-front && npm run lint && npm run typecheck && npm run format)"
