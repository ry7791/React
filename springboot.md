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





# Spring에서 Controller의 전달인자

Spring을 사용하다 보면 Controller 단에서 클라이언트에서 URL에 파라메터를 같이 전달하는 경우가 있습니다.
주로 사용하는 형태는 아래의 두 가지가 대표적인 케이스입니다.

> Type 1 => [http://127.0.0.1?index=1&page=2](http://127.0.0.1/?index=1&page=2)
> Type 2 => http://127.0.0.1/index/1

**Type 1**의 경우 파라메터의 값과 이름을 함께 전달하는 방식으로 게시판 등에서 페이지 및 검색 정보를 함께 전달하는 방식을 사용할 때 많이 사용합니다.
**Type 2**의 경우 Rest api에서 값을 호출할 때 주로 많이 사용합니다.

Spring에서는 이러한 전달인자를 처리하는데 두 가지 방법을 제공합니다.



## @RequestParam 사용하기

**Type 1**의 URL을 처리할 때 **@RequestParam**을 사용하게 됩니다.
아래의 예제와 같이 Controller 단에서 사용합니다.

```java
@GetMapping("read")
public ModelAndView getFactoryRead(@RequestParam("no") int factroyId, SearchCriteria criteria) 
{
  //...    
}
```

위의 경우 **/read?no=1**와 같이 url이 전달될 때 no 파라메터를 받아오게 됩니다.
@RequestParam 어노테이션의 괄호 안의 경우 전달인자 이름(실제 값을 표시)입니다.

이렇게 **@RequestParam**의 경우 url 뒤에 붙는 파라메터의 값을 가져올 때 사용을 합니다.



## @PathVariable 사용하기

**Type 2**의 URL을 처리할 때는 **@PathVariable**을 사용하게 됩니다.

```java
@PostMapping("delete/{idx}")
@ResponseBody
public JsonResultVo postDeleteFactory(@PathVariable("idx") int factoryIdx) {
	return factoryService.deleteFacotryData(factoryIdx);
}
```

위에 예제 코드처럼 **PathVariable**의 경우 url에서 각 구분자에 들어오는 값을 처리해야 할 때 사용합니다.



## 실제로 사용은?

물론 **@RequestParam** 또는 **@PathVariable** 하나만 사용하는 것이 아닌 복합적으로 사용을 하기도 합니다.

```java
@GetMapping("/user/{userIdx}/invoices")
public List<Invoice> listUsersInvoices(
	@PathVariable("userIdx") int user,
	@RequestParam(value = "date", required = false) Date dateOrNull
    // required 조건이 없으면 기본값은 true, 즉 필수 파라미터이다. 파라미터 date가 존재하지 않으면 Exception 발생.
    // required = false 일때 파라미터 date가 존재하지 않으면 Date dateOrNull 값은 null

)	
{ }
```







### Filter

> 특정 정보만 보여주기

```java
package com.example.demo.entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor //인자 있는 생성자 자동으로 만들어줌
@NoArgsConstructor //default 생성자 자동으로 만들어줌
@JsonFilter("UserInfo")
public class User {
	
	
	private Integer id;
	private String name;
	private Date joinDate;
	//@JsonIgnore
	private String password;
	//@JsonIgnore
	private String ssn;
	
   //JsonIgnore를 쓰던가 JsonFilter를 써서 민감한 정보는 숨기자
}
```

```java
@GetMapping("/users")
	public MappingJacksonValue getUserList() {
		List<User> list = service.getUserList();
		// list의 내용 출력
//		for (User user : list) {
//			// System.out.println(user);
//			log.info(user.toString());
//		}
		List<EntityModel<User>> result = new ArrayList<>();
		for (User user : list) {
			EntityModel<User> model = new EntityModel<>(user);
			WebMvcLinkBuilder linkTo = linkTo(methodOn(this.getClass()).getUser(user.getId()));
			model.add(linkTo.withRel("user-detail")); 
			
			result.add(model);
		}
		
		
		SimpleBeanPropertyFilter filter = SimpleBeanPropertyFilter.filterOutAllExcept("id", "name", "joinDate");
		FilterProvider provider = new SimpleFilterProvider().addFilter("UserInfo", filter);

		MappingJacksonValue mapping = new MappingJacksonValue(result);
		mapping.setFilters(provider);
		
		return mapping;
	}

```



- asList : 배열값을 list로 만들어줌 (자바는 배열형태의 값을 못 쓰므로 list로 만들어줌)