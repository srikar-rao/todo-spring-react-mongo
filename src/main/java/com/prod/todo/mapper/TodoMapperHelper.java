package com.prod.todo.mapper;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public final class TodoMapperHelper {

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("MM/dd/yyyy hh:mm a z")
            .withLocale(Locale.US)
            .withZone(ZoneId.of("America/New_York")); // or ZoneId.systemDefault()

    public static String formatLocale(Instant timestamp) {
        return timestamp == null ? null : FORMATTER.format(timestamp);
    }
}
