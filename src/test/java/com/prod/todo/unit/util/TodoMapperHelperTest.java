package com.prod.todo.unit.util;

import com.prod.todo.mapper.TodoMapperHelper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import static org.assertj.core.api.Assertions.assertThat;

class TodoMapperHelperTest {

    @Test
    @DisplayName("Should format Instant to US locale string with New York timezone")
    void formatLocale_ShouldFormatInstantCorrectly() {
        Instant instant = Instant.parse("2024-05-01T14:30:00Z");

        String formatted = TodoMapperHelper.formatLocale(instant);

        ZonedDateTime expectedZonedDateTime = instant.atZone(ZoneId.of("America/New_York"));
        String expected = expectedZonedDateTime.format(java.time.format.DateTimeFormatter.ofPattern("MM/dd/yyyy hh:mm a z").withLocale(java.util.Locale.US));

        assertThat(formatted).isEqualTo(expected);
    }

    @Test
    @DisplayName("Should return null when input Instant is null")
    void formatLocale_ShouldReturnNull_WhenInputIsNull() {
        assertThat(TodoMapperHelper.formatLocale(null)).isNull();
    }
}
