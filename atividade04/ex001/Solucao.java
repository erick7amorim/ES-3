public interface OperacoesBancarias {
    void depositar(double valor);
    void sacar(double valor);
}

public class ContaBancaria {
    private double saldo;
    private OperacoesBancarias operacoesBancarias;

    public ContaBancaria(double saldoInicial, OperacoesBancarias operacoesBancarias) {
        this.saldo = saldoInicial;
        this.operacoesBancarias = operacoesBancarias;
    }

    public void realizarDeposito(double valor) {
        operacoesBancarias.depositar(valor);
    }

    public void realizarSaque(double valor) {
        operacoesBancarias.sacar(valor);
    }

    public double getSaldo() {
        return saldo;
    }
}

public class ContaPoupanca implements OperacoesBancarias {
    private double saldo;

    public ContaPoupanca(double saldoInicial) {
        this.saldo = saldoInicial;
    }

    @Override
    public void depositar(double valor) {
        saldo += valor;
    }

    @Override
    public void sacar(double valor) {
        if (valor > 1000) {
            throw new RuntimeException("Não pode sacar mais de 1000 em uma poupança");
        }
        saldo -= valor;
    }
}
