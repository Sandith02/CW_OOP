public class Configuration {
    private int totalTickets;
    private int releaseRate;
    private int releaseInterval;
    private int retrievalInterval;
    private int ticketPoolCapacity = 10; // Default capacity

    public Configuration(int totalTickets, int releaseRate, int releaseInterval, int retrievalInterval) {
        this.totalTickets = totalTickets;
        this.releaseRate = releaseRate;
        this.releaseInterval = releaseInterval;
        this.retrievalInterval = retrievalInterval;
    }

    public int getTotalTickets() {
        return totalTickets;
    }

    public int getReleaseRate() {
        return releaseRate;
    }

    public int getReleaseInterval() {
        return releaseInterval;
    }

    public int getRetrievalInterval() {
        return retrievalInterval;
    }

    public int getTicketPoolCapacity() {
        return ticketPoolCapacity;
    }
}
