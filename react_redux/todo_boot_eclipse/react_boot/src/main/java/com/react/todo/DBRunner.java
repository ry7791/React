package com.react.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.react.todo.entity.Todo;
import com.react.todo.repository.TodoRepository;

@Component
public class DBRunner implements ApplicationRunner{
	@Autowired
	private TodoRepository repository;
	
	
	@Override
	public void run(ApplicationArguments args) throws Exception {
		Todo todo1 = new Todo();
		todo1.setText("할일111");
		todo1.setChecked(true);
		repository.save(todo1);
		
		Todo todo2 = new Todo();
		todo2.setText("할일2");
		todo2.setChecked(false);
		repository.save(todo2);
		
	}
}
