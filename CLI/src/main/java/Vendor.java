public class Vendor implements Runnable {
    private final TicketPool ticketPool;
    private final int totalTickets;
    private final int releaseRate;
    private final int releaseInterval;

    public Vendor(TicketPool ticketPool, int totalTickets, int releaseRate, int releaseInterval) {
        this.ticketPool = ticketPool;
        this.totalTickets = totalTickets;
        this.releaseRate = releaseRate;
        this.releaseInterval = releaseInterval;
    }

    @Override
    public void run() {
        int ticketCounter = 1;
        try {
            while (ticketCounter <= totalTickets) {
                for (int i = 0; i < releaseRate && ticketCounter <= totalTickets; i++) {
                    ticketPool.addTicket("Ticket-" + ticketCounter);
                    ticketCounter++;
                }
                Thread.sleep(releaseInterval);
            }
        } catch (InterruptedException e) {
            Logger.log("Vendor interrupted.");
        }
    }
}
