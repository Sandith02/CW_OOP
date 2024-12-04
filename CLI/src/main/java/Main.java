import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Logger.initialize(); // Initialize the logger

        Logger.log("Welcome to the Real-Time Ticketing System!");
        System.out.println("Welcome to the Real-Time Ticketing System!");

        Configuration config = null;
        boolean configurationComplete = false;

        while (!configurationComplete) {
            displayConfigurationMenu();
            int choice = scanner.nextInt();

            switch (choice) {
                case 1: // Set all configuration options
                    config = gatherConfiguration(scanner);
                    saveConfigurationToJSON(config);
                    break;
                case 2: // View current configuration
                    if (config == null) {
                        System.out.println("Configuration not set yet.");
                        Logger.log("Attempted to view configuration but no configuration was set.");
                    } else {
                        displayCurrentConfiguration(config);
                    }
                    break;
                case 3: // Start the system
                    if (config != null) {
                        configurationComplete = true;
                    } else {
                        System.out.println("Please complete the configuration first (option 1).");
                        Logger.log("Attempted to start the system without completing the configuration.");
                    }
                    break;
                default:
                    System.out.println("Invalid option. Please choose between 1, 2, and 3.");
                    Logger.log("Invalid menu option selected.");
                    break;
            }
        }

        // Initialize and start threads
        TicketPool pool = new TicketPool(config.getTicketPoolCapacity());
        Vendor vendor = new Vendor(pool, config.getTotalTickets(), config.getReleaseRate(), config.getReleaseInterval());
        Customer customer = new Customer(pool, config.getRetrievalInterval());

        Thread vendorThread = new Thread(vendor, "Vendor");
        Thread customerThread = new Thread(customer, "Customer");

        vendorThread.start();
        customerThread.start();

        Logger.log("Vendor and Customer threads started.");
        System.out.println("Press Enter to stop the system...");
        scanner.nextLine(); // Consume leftover newline
        scanner.nextLine(); // Wait for termination input

        vendorThread.interrupt();
        customerThread.interrupt();

        Logger.log("System terminated.");
        Logger.close(); // Close the log file
    }

    public static void displayConfigurationMenu() {
        System.out.println("=====================================");
        System.out.println("           CONFIGURATION MENU        ");
        System.out.println("=====================================");
        System.out.println("1. Set Configuration");
        System.out.println("2. View current configuration");
        System.out.println("3. Start the system");
        System.out.println("=====================================");
        System.out.print("Please choose an option (1, 2, 3): ");
    }

    public static Configuration gatherConfiguration(Scanner scanner) {
        System.out.print("Enter total number of tickets: ");
        int totalTickets = scanner.nextInt();

        System.out.print("Enter ticket release rate (number of tickets per release): ");
        int releaseRate = scanner.nextInt();

        System.out.print("Enter ticket release interval (ms): ");
        int releaseInterval = scanner.nextInt();

        System.out.print("Enter ticket retrieval interval (ms): ");
        int retrievalInterval = scanner.nextInt();

        Logger.log("User input configuration: " +
                "Total Tickets=" + totalTickets + ", " +
                "Release Rate=" + releaseRate + ", " +
                "Release Interval=" + releaseInterval + "ms, " +
                "Retrieval Interval=" + retrievalInterval + "ms.");

        return new Configuration(totalTickets, releaseRate, releaseInterval, retrievalInterval);
    }

    public static void displayCurrentConfiguration(Configuration config) {
        System.out.println("=====================================");
        System.out.println("       CURRENT CONFIGURATION         ");
        System.out.println("=====================================");
        System.out.println("Total Tickets: " + config.getTotalTickets());
        System.out.println("Release Rate: " + config.getReleaseRate());
        System.out.println("Release Interval: " + config.getReleaseInterval() + " ms");
        System.out.println("Retrieval Interval: " + config.getRetrievalInterval() + " ms");
        System.out.println("=====================================");
    }

    public static void saveConfigurationToJSON(Configuration config) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        try (FileWriter writer = new FileWriter("config.json")) {
            gson.toJson(config, writer);
            System.out.println("Configuration saved to config.json");
        } catch (IOException e) {
            System.out.println("Error saving configuration to file: " + e.getMessage());
            Logger.log("Error saving configuration to JSON file: " + e.getMessage());
        }
    }
}
