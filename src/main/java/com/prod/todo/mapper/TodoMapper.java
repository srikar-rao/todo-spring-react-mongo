package com.prod.todo.mapper;

import com.prod.todo.entity.TodoEntity;
import com.prod.todo.model.Todo;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring", imports = {TodoMapperHelper.class})
public interface TodoMapper {

    Todo toModel(TodoEntity entity);

    @Named("toModelWithLocaleMapping")
    @Mapping(target = "localeCreatedAt", expression = "java(TodoMapperHelper.formatLocale(entity.getCreatedAt()))")
    @Mapping(target = "localeUpdatedAt", expression = "java(TodoMapperHelper.formatLocale(entity.getUpdatedAt()))")
    Todo toModelWithLocale(TodoEntity entity);

    @IterableMapping(qualifiedByName = "toModelWithLocaleMapping")
    List<Todo> toModelListWithLocale(List<TodoEntity> entities);

    TodoEntity toEntity(Todo model);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    TodoEntity toNewEntity(Todo model);
}
