import java.util.LinkedList;
import java.util.Queue;

public class TicketPool {
    private final Queue<String> tickets = new LinkedList<>();
    private final int maxTicketCapacity;

    public TicketPool(int maxTicketCapacity) {
        this.maxTicketCapacity = maxTicketCapacity;
    }

    public synchronized void addTicket(String ticket) throws InterruptedException {
        while (tickets.size() >= maxTicketCapacity) {
            wait();
        }
        tickets.add(ticket);
        Logger.log("Ticket added: " + ticket + " (Pool size: " + tickets.size() + ")");
        notifyAll();
    }

    public synchronized String retrieveTicket() throws InterruptedException {
        while (tickets.isEmpty()) {
            wait();
        }
        String ticket = tickets.poll();
        Logger.log("Ticket removed: " + ticket + " (Pool size: " + tickets.size() + ")");
        notifyAll();
        return ticket;
    }
}
