import java.io.*;

public interface IPersistencia {
    void salvar(String dados, String arquivo) throws IOException;
}

public class PersistenciaBase implements IPersistencia {
    @Override
    public void salvar(String dados, String arquivo) throws IOException {
        try (FileWriter writer = new FileWriter(arquivo)) {
            writer.write(dados);
        }
    }
}


public class PersistenciaJSON implements IPersistencia {
    private final IPersistencia persistenciaBase;

    public PersistenciaJSON(IPersistencia persistenciaBase) {
        this.persistenciaBase = persistenciaBase;
    }

    @Override
    public void salvar(String dados, String arquivo) throws IOException {
        if (!dados.startsWith("{")) {
            throw new IllegalArgumentException("Dados não estão em formato JSON.");
        }
        persistenciaBase.salvar(dados, arquivo);
    }
}


public class ExemploUsoPersistencia {
    public static void main(String[] args) {

        IPersistencia persistenciaBase = new PersistenciaBase();

        IPersistencia persistenciaJSON = new PersistenciaJSON(persistenciaBase);

        try {
            persistenciaBase.salvar("Dados genéricos", "arquivo.txt");

            persistenciaJSON.salvar("{ \"chave\": \"valor\" }", "arquivo.json");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
