import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Logger {
    private static FileWriter logFileWriter;

    public static void initialize() {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd - h.mm a"));
        String logFileName = "SystemLog_" + timestamp + ".log";
        try {
            logFileWriter = new FileWriter(logFileName, true); // Append mode
            log("Logger initialized. Writing to " + logFileName);
        } catch (IOException e) {
            System.out.println("Error initializing logger: " + e.getMessage());
        }
    }

    public static void log(String message) {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        String logEntry = message;

        // Print to console
        System.out.println(logEntry);

        // Write to log file
        if (logFileWriter != null) {
            try {
                logFileWriter.write(logEntry + "\n");
                logFileWriter.flush();
            } catch (IOException e) {
                System.out.println("Error writing to log file: " + e.getMessage());
            }
        }
    }

    public static void close() {
        try {
            if (logFileWriter != null) {
                log("Logger closed.");
                logFileWriter.close();
            }
        } catch (IOException e) {
            System.out.println("Error closing log file: " + e.getMessage());
        }
    }
}
