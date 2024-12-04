import java.util.LinkedList;
import java.util.Queue;

public class TicketPool {
    private final Queue<String> tickets = new LinkedList<>();
    private final int capacity;

    public TicketPool(int capacity) {
        this.capacity = capacity;
    }

    public synchronized void addTicket(String ticket) throws InterruptedException {
        while (tickets.size() >= capacity) {
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
