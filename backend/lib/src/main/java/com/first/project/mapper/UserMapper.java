package com.first.project.mapper;

import com.first.project.entity.User;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectKey;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface UserMapper {
   @Select("SELECT * FROM users")
	   //@Results({
	   //@Result(property = "created_At", column = "created_at"),
	   //@Result(property = "updated_At", column = "updated_at") }) 
    List<User> findAll();
	 @Select("SELECT * FROM users where managerYn = 'Y'") 
    List<User> findManagerUsers();
	 @Insert("INSERT INTO users (username, password, email, managerYn) VALUES (#{username}, #{password}, #{email},#{managerYn})")
	   @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
	   @SelectKey(statement = "SELECT LAST_INSERT_ID()", keyProperty = "id", before= false, resultType = Long.class)
    int save(User user);
	 @Update("UPDATE users set username = #{username}, managerYn = #{managerYn} WHERE id = #{id} ")	 
    int updateUser(User user);
   @Select("SELECT * FROM users where email = #{email}")
		User findByEmail(String email);
}
