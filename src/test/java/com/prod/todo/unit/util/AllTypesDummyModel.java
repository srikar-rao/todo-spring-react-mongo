package com.prod.todo.unit.util;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AllTypesDummyModel {

    // Primitives
    private int intVal;
    private long longVal;
    private double doubleVal;
    private boolean boolVal;

    // Boxed types
    private Integer integerVal;
    private Long longObj;
    private Double doubleObj;
    private Boolean booleanObj;

    // Textual
    private String stringVal;
    private Character charVal;

    // Date & Time
    private Instant instantVal;
    private LocalDate localDateVal;
    private LocalDateTime localDateTimeVal;
    private ZonedDateTime zonedDateTimeVal;

    // Numeric
    private BigDecimal bigDecimalVal;
    private BigInteger bigIntegerVal;

    // UUID
    private UUID uuidVal;

    // Collections
    private List<String> stringList;
    private Set<Integer> integerSet;
    private Map<String, Object> genericMap;

    // Enums
    private DummyEnum enumVal;

    // Nested object
    private Nested nested;

    public enum DummyEnum {
        ALPHA,
        BETA,
        GAMMA
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Nested {
        private String nestedName;
        private int nestedValue;
    }
}
