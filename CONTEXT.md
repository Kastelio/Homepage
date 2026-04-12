# 홈페이지 작업 컨텍스트

## 사이트
- URL: https://deokgoo1202.github.io/Homepage/
- 소스: `G:/내 드라이브/1_Game Design/20260303_홈페이지/`
- 이미지 임시 폴더: `C:/Users/deokgoo/Desktop/홈페이지/`
- 작업 후 항상: `python build.py` → `git add -A && git commit && git push`

## 페이지 구성
- `index.html` — About Me
- `projects.html` / `project.html` — Projects (킹스로드, 제노니아)
- `playing.html` — Playlist
- `etc.html` — Keep Trying... (Claude Code로 만든 결과물들)

## Playlist 탭
| 탭 | 조건 | 정렬 |
|----|------|------|
| 패키지 | package: Yes | 플레이시간 내림차순 |
| 라이브 | package: No, tasting 아님 | 과금액 내림차순 |
| 찍먹 | tasting: yes | 과금액 내림차순 |
| 추억 | childhood: yes | 출시연도 내림차순 |

## NOW PLAYING 현황 (current: yes)
- 붉은사막 (current_order: 1)
- 트릭컬 리바이브 (current_order: 2)
- 승리의 여신: 니케 (current_order: 3)
- 메이플 키우기 (current_order: 4)
- 엘트릭스 (current_order: 5, payment: 900)

## 추억 탭 게임 목록 (총 50개)
C9, GTA 4, GTA: 바이스 시티, HEARTHSTONE, Heroes Of The Storm, League Of Legends,
건즈, 겟엠프드, 다크에덴, 던전앤파이터, 디아블로 1, 디아블로 2, 디아블로 3, 디아블로 3: 영혼을 거두는 자,
롤러코스터 타이쿤, 리듬스타, 마비노기 영웅전, 마인크래프트, 메이플스토리, 믹스마스터,
바람의 나라, 배틀필드 온라인, 버블보블, 부족전쟁, 서든어택, 슈퍼액션히어로,
스타크래프트, 스타크래프트 2, 아발론 온라인, 액션퍼즐패밀리, 야채부락리,
에이지 오브 엠파이어 2, 에이지 오브 엠파이어 3, 엘더스크롤 4: 오블리비언, 엘리온,
영웅서기3: 대지의 성흔, 워록, 워크래프트 III: 레인 오브 카오스, 워크래프트 III: 프로즌 쓰론,
천하제일 거상, 카트라이더, 커맨드 앤 컨커 레드얼럿 2, 쿠키런, 큐플레이, 크레이지 아케이드,
테일즈런너, 포켓몬스터 골드, 포트리스, 피파 온라인, 헬게이트 런던

## 이미지 작업 방식
- 유저가 `C:/Users/deokgoo/Desktop/홈페이지/`에 이미지 넣으면 내가 복사
- 파일명은 자유 (webp/jpg/png 모두 OK), 각 게임 폴더에 thumb.{ext} 로 복사
- 기존 thumbnail.jpg 있으면 삭제 후 교체

## 주요 작업 이력 (2026-03)
- Etc 페이지 신규 생성 (Keep Trying... 컨셉)
- 모바일 nav 2줄 구조, 히스토리 세로 정렬
- Playlist 배경 AI 이미지 적용
- build.py current_order 파싱 버그 수정
- 히스토리 모바일 날짜 개행 ( · 기준)
- Playlist 활성 탭 노란 배경으로 강조
