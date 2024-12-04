public class Customer implements Runnable {
    private final TicketPool ticketPool;
    private final int retrievalInterval;

    public Customer(TicketPool ticketPool, int retrievalInterval) {
        this.ticketPool = ticketPool;
        this.retrievalInterval = retrievalInterval;
    }

    @Override
    public void run() {
        try {
            while (!Thread.currentThread().isInterrupted()) {
                String ticket = ticketPool.retrieveTicket();
                Logger.log("Customer purchased: " + ticket);
                Thread.sleep(retrievalInterval);
            }
        } catch (InterruptedException e) {
            Logger.log("Customer interrupted.");
        }
    }
}
