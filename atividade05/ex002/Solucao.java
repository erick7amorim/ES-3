public interface OperacoesBancarias {
    void depositar(double valor);
    void sacar(double valor);
    double getSaldo();
}

public class Conta implements OperacoesBancarias {
    private double saldo;
    private String numeroConta;

    public Conta(String numeroConta, double saldoInicial) {
        this.numeroConta = numeroConta;
        this.saldo = saldoInicial;
    }

    @Override
    public void depositar(double valor) {
        saldo += valor;
    }

    @Override
    public void sacar(double valor) {
        if (valor > saldo) {
            throw new IllegalArgumentException("Saldo insuficiente.");
        }
        saldo -= valor;
    }

    @Override
    public double getSaldo() {
        return saldo;
    }
}

public class ContaCliente implements OperacoesBancarias {
    private OperacoesBancarias conta;
    private String nome;
    private String cpf;
    private String endereco;

    public ContaCliente(String numeroConta, double saldoInicial, String nome, String cpf, String endereco) {
        this.conta = new Conta(numeroConta, saldoInicial);
        this.nome = nome;
        this.cpf = cpf;
        this.endereco = endereco;
    }

    @Override
    public void depositar(double valor) {
        conta.depositar(valor);
    }

    @Override
    public void sacar(double valor) {
        conta.sacar(valor);
    }

    @Override
    public double getSaldo() {
        return conta.getSaldo();
    }

}
