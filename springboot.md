### lombok

>자바에서 Model(DTO, VO, Domain) Object 를 만들때, 멤버필드(프로퍼티)에 대한 Getter/Setter, ToString과 멤버필드에 주입하는 생성자를 만드는 코드 등 불필요하게 반복적으로 만드는 코드를 어노테이션을 통해 줄여 주는 라이브러리, 프로젝트 입니다.

```java
package com.example.demo.entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor //인자 있는 생성자 자동으로 만들어줌
@NoArgsConstructor //default 생성자 자동으로 만들어줌
public class User {
	
	
	private int id;
	private String name;
	private Date joinDate;
	@JsonIgnore
	private String password;
	@JsonIgnore
	private String ssn;
	

}

```







