package org.studysystem.backend.entity.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonValue;

@JsonFormat(shape = JsonFormat.Shape.STRING)
public enum AttendanceStatus {
    PRESENT("PRESENT"),
    ABSENT_EXCUSED("ABSENT_EXCUSED"), //vắng có phép
    ABSENT_UNEXCUSED("ABSENT_UNEXCUSED"); // vắng không phép

    private final String value;

    AttendanceStatus(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static AttendanceStatus fromValue(String value) {
        for (AttendanceStatus status : AttendanceStatus.values()) {
            if (status.value.equalsIgnoreCase(value)) {
                return status;
            }
        }
        throw new IllegalArgumentException("No enum constant " + AttendanceStatus.class.getCanonicalName() + "." + value);
    }
}
