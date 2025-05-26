public class Customer implements Runnable {
    private final TicketPool ticketPool;
    private final int retrievalRate;

    public Customer(TicketPool ticketPool, int retrievalRate) {
        this.ticketPool = ticketPool;
        this.retrievalRate = retrievalRate;
    }

    @Override
    public void run() {
        try {
            while (!Thread.currentThread().isInterrupted()) {
                String ticket = ticketPool.retrieveTicket();
                Logger.log("Customer purchased: " + ticket);
                Thread.sleep(retrievalRate);
            }
        } catch (InterruptedException e) {
            Logger.log("Customer interrupted.");
        }
    }
}
