# API BOARD

`게시판` 웹 애플리케이션 입니다.  
`2023-08-10 ~ 2023-08-13` 동안 `Spring Boot`와 `React`를 사용해 구현했습니다.

[CICD_PROJECT](https://github.com/ha2ee/cicd_project) 템플릿을 활용 하였으며,  
이 프로젝트를 통해 이루고자 한 목표는 `FrontEnd - BackEnd 통신 이해`였습니다.  
프로젝트 구현 과정 동안, 회원 인증/인가를 고민하며 코드를 작성하였습니다.

# 📚목차

* [프로젝트 구조]
* [사용 기술]
* [구현 기능]
* [기능 실행화면]
* [API 명세서]
* [ERD 설계]

# 📘 프로젝트 구조
### 📌 BackEnd
<img width="575" alt="backend-project-structure" src="https://github.com/ha2ee/apiboard/assets/115638416/db50b63f-9cea-4742-a5b7-cf1a62d85e35">

### 📌 FrontEnd
<img width="575" alt="frontend-project-structure" src="https://github.com/ha2ee/apiboard/assets/115638416/bc543be2-1862-4758-a1db-d6566bb7193a">

# 🕹사용 기술
### 📌 BackEnd
|기술|버전|
|----|----|
|Spring Boot|2.7.13|
|Spring Security|5.7.9|
|Bean Validation|2.0.2|
|JSON Web Token|0.11.2|
|MyBatis|3.5.13|
|H2 Database|2.1.214|
|Swagger|3.0.0|

### 📌 FrontEnd
|기술|버전|
|----|----|
|NodeJs|18.17.0|
|React|18.2.0|
|react-dom|18.2.0|
|react-router|6.14.2|
|react-router-dom|6.14.2|

# 🐱‍🏍 구현 기능
* 게시판 기능
  * 모든 게시글 및 특정 게시글 조회
  * 게시글 검색 [제목, 내용, 작성자]
  * 게시글 작성 [회원]
  * 게시글 수정 [회원 - 게시글 작성자]
  * 게시글 삭제 [회원 - 게시글 작성자]
 * 댓글 기능
   * 댓글 조회
   * 댓글 작성 [회원]
   * 댓글 수정 [회원 - 댓글 작성자]
   * 댓글 삭제 [회원 - 댓글 작성자]
  * 회원 기능
    * 회원 가입
    * 로그인 / 로그아웃

# 📺 기능 실행화면
## 게시판 기능
### 모든 게시글 및 특정 게시글 조회
* 모든 게시글을 조회 할 수 있습니다. 페이징 기능을 통해 한 페이지에서 최대 10개의 게시글이 조회 됩니다.
<img width="1000" alt="boardlist1" src="https://github.com/ha2ee/apiboard/assets/115638416/4cd342fc-2f00-4c54-99bb-f4222b3075aa">
<img width="1000" alt="boardlist1" src="https://github.com/ha2ee/apiboard/assets/115638416/62ad2731-2f15-4871-9ace-91e209dcb6e8">

* 게시글의 제목을 클릭하면, 게시글의 상세 내용을 조회 할 수 있습니다.
<img width="1000" alt="boarddetail1" src="https://github.com/ha2ee/apiboard/assets/115638416/ac0f54e4-5c5c-4868-ae04-26a7e196ecd5">


### 게시글 검색
* 게시글의 제목과 내용 또는 작성자로 게시글을 검색 할 수 있습니다.
<img width="1000" alt="boardsearch" src="https://github.com/ha2ee/apiboard/assets/115638416/5afc22e1-b7fd-4e77-a72c-e814dff502de">

### 게시글 작성
* 로그인 한 사용자는 게시글을 작성 할 수 있습니다.
<img width="1000" alt="boardwrite" src="https://github.com/ha2ee/apiboard/assets/115638416/214f51a2-1ee1-4edb-81ca-9686a2c09ff0">
<img width="1000" alt="boardwrite2" src="https://github.com/ha2ee/apiboard/assets/115638416/6e957b9d-c0e0-4e73-a98c-759e2b6a5f04">
<img width="1000" alt="boardwrite3" src="https://github.com/ha2ee/apiboard/assets/115638416/902d769e-e0dd-43f5-8a7e-d11c9cfdca92">

* 로그인 하지 않은 사용자는 게시글 작성이 제한됩니다.
<img width="1000" alt="boardwrite-auth" src="https://github.com/ha2ee/apiboard/assets/115638416/45b16868-9e58-4404-844a-3b8fc6dda767">

### 게시글 수정
* 게시글 작성자는 게시글을 수정 할 수 있습니다.
<img width="1000" alt="boardupdate" src="https://github.com/ha2ee/apiboard/assets/115638416/e9409535-85ea-43ab-a601-d1652892d83c">
<img width="1000" alt="boardupdate2" src="https://github.com/ha2ee/apiboard/assets/115638416/23cd8f39-ac0a-4756-8b59-a103432d8d0b">
<img width="1000" alt="boardupdate3" src="https://github.com/ha2ee/apiboard/assets/115638416/bf6ac57c-443c-4ef6-a62c-963a68ab8ea1">

* 자신이 작성한 게시글에만 수정, 삭제 버튼이 활성화 됩니다.
<img width="1000" alt="boardupdate-delete-active" src="https://github.com/ha2ee/apiboard/assets/115638416/190ca7a7-4f7f-49e0-b03a-2cc3a97f3948">

### 게시글 삭제
* 게시글 작성자는 게시글을 삭제 할 수 있습니다.
<img width="1000" alt="boarddelete" src="https://github.com/ha2ee/apiboard/assets/115638416/f7d8fac1-a063-4f18-bca5-2488e2c2cfab">
* 삭제된 게시글은 논리 삭제로 데이터를 보관합니다.
<img width="1000" alt="boarddelete1" src="https://github.com/ha2ee/apiboard/assets/115638416/0035e4ad-e9c4-4f89-b887-8419c2c5e756">


## 댓글 기능
### 댓글 조회
* `게시글 상세`에서 댓글을 조회 할 수 있습니다. 페이징 기능을 통해 한 페이지에 최대 10개의 댓글이 조회 됩니다.
<img width="1000" alt="commentlist" src="https://github.com/ha2ee/apiboard/assets/115638416/beb37779-461e-47b3-a400-efd2b5ee73cc">
<img width="1000" alt="commentlist2" src="https://github.com/ha2ee/apiboard/assets/115638416/f9d66cef-ebe6-4adb-9105-90a720a52491">

### 댓글 작성
* 로그인 한 사용자는 댓글을 작성 할 수 있습니다.
<img width="1000" alt="commentwrite" src="https://github.com/ha2ee/apiboard/assets/115638416/372ffdad-215c-4981-9e20-368d311d0df0">
<img width="1000" alt="commentwrite2" src="https://github.com/ha2ee/apiboard/assets/115638416/75c3adc9-1112-44f8-9467-bd35d10ad2be">

### 댓글 수정
* 자신이 작성한 댓글을 수정 할 수 있습니다.
<img width="1000" alt="commentupdate" src="https://github.com/ha2ee/apiboard/assets/115638416/b5221108-0d0b-43ec-b4e7-c6ed3bde68e5">
<img width="1000" alt="commentupdate2" src="https://github.com/ha2ee/apiboard/assets/115638416/082e4a0d-0dd6-4815-9647-9268d34a18b5">

### 댓글 삭제
* 자신이 작성한 댓글을 삭제 할 수 있습니다.
<img width="1000" alt="commentdelete" src="https://github.com/ha2ee/apiboard/assets/115638416/a43247ce-8519-4503-a47b-fdc0df8bb1b9">
<img width="1000" alt="commentdelete2" src="https://github.com/ha2ee/apiboard/assets/115638416/c926729e-4cd5-4595-9278-bc6cd21063e9">
<img width="1000" alt="commentdelete3" src="https://github.com/ha2ee/apiboard/assets/115638416/835d140b-b2ff-45bf-891e-289cbf17a37b">


