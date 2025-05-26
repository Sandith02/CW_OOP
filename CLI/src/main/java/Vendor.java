public class Vendor implements Runnable {
    private final TicketPool ticketPool;
    private final int totalTickets;
    private final int ticketReleaseRate;

    public Vendor(TicketPool ticketPool, int totalTickets, int ticketReleaseRate) {
        this.ticketPool = ticketPool;
        this.totalTickets = totalTickets;
        this.ticketReleaseRate = ticketReleaseRate;
    }

    @Override
    public void run() {
        int ticketCounter = 1;
        try {
            while (ticketCounter <= totalTickets) {
                for (int i = 0; i < ticketReleaseRate && ticketCounter <= totalTickets; i++) {
                    ticketPool.addTicket("Ticket-" + ticketCounter);
                    ticketCounter++;
                }
                Thread.sleep(1000); // 1-second delay between releases
            }
        } catch (InterruptedException e) {
            Logger.log("Vendor interrupted.");
        }
    }
}
