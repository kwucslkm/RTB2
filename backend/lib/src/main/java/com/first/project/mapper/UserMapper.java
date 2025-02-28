package com.first.project.mapper;

import com.first.project.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import java.util.List;

@Mapper
public interface UserMapper {
    @Select("SELECT * FROM users")
    @Results({
      @Result(property = "create_At", column = "created_at")
  })
    List<User> findAll();
}
