# 로또번호생성기 웹앱
## 배포
1. 도커 이미지 빌드
```sh
docker build -t my-nginx-app .
```

2. 실행
```sh
docker run -d -p 8080:80 my-nginx-app
```