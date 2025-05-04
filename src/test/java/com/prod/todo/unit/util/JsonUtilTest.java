package com.prod.todo.unit.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.prod.todo.util.JsonUtil;
import org.instancio.Instancio;
import org.instancio.Select;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

class JsonUtilTest {

    @Test
    @DisplayName("should convert POJO to JsonNode")
    void shouldConvertPojoToJsonNode() {
        AllTypesDummyModel model = createSampleModel();

        JsonNode node = JsonUtil.toJsonNode(model);

        assertThat(node).isNotNull();
        assertThat(node.get("stringVal").asText()).isEqualTo(model.getStringVal());
        assertThat(node.get("intVal").asInt()).isEqualTo(model.getIntVal());
        assertThat(node.get("enumVal").asText()).isEqualTo(model.getEnumVal().name());
        assertThat(node.get("nested").get("nestedName").asText()).isEqualTo(model.getNested().getNestedName());
    }

    @Test
    @DisplayName("should convert JsonNode back to POJO")
    void shouldConvertJsonNodeToPojo() {
        AllTypesDummyModel original = createSampleModel();

        JsonNode node = JsonUtil.toJsonNode(original);
        AllTypesDummyModel result = JsonUtil.fromJsonNode(node, AllTypesDummyModel.class);

        assertThat(result).isEqualTo(original);
    }

    @Test
    @DisplayName("should serialize POJO to JSON string")
    void shouldSerializePojoToJsonString() {
        AllTypesDummyModel model = createSampleModel();

        String json = JsonUtil.toJsonString(model);

        assertThat(json).contains(model.getStringVal());
        assertThat(json).contains(model.getEnumVal().name());
        assertThat(json).contains(model.getNested().getNestedName());
    }

    @Test
    @DisplayName("should deserialize JSON string back to POJO")
    void shouldDeserializeJsonStringToPojo() {
        AllTypesDummyModel original = createSampleModel();

        String json = JsonUtil.toJsonString(original);
        AllTypesDummyModel result = JsonUtil.fromJsonString(json, AllTypesDummyModel.class);

        assertThat(result).isEqualTo(original);
    }

    private AllTypesDummyModel createSampleModel() {
        return Instancio.of(AllTypesDummyModel.class)
                .set(Select.field(AllTypesDummyModel::getEnumVal), AllTypesDummyModel.DummyEnum.BETA)
                .set(Select.field(AllTypesDummyModel::getStringVal), "dummy string")
                .set(Select.field(AllTypesDummyModel.Nested::getNestedName), "nested dummy")
                .set(Select.field(AllTypesDummyModel::getGenericMap),
                        Map.of("key1", "value", "key2", 123, "key3", true))
                .create();
    }

}
