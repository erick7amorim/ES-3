import java.util.ArrayList;
import java.util.List;

public class Perfil {
    private int id;
    private String nomeUsuario;

    public Perfil(int id, String nomeUsuario) {
        this.nomeUsuario = nomeUsuario;
        this.id = id;
    }

    public String getNomeUsuario() {
        return nomeUsuario;
    }

    // Outros métodos
}

public interface Publicavel {
    void exibir();

    Perfil getAutor();
}

public class Postagem implements Publicavel {
    private String id;
    private Perfil autor;
    private String conteudo;
    private List<Reacao> reacoes;
    private List<Comentario> comentarios;

    public Postagem(String id, Perfil autor, String conteudo) {
        this.id = id;
        this.autor = autor;
        this.conteudo = conteudo;
        this.reacoes = new ArrayList<>();
        this.comentarios = new ArrayList<>();
    }

    public void adicionarReacao(Reacao reacao) {
        reacoes.add(reacao);
    }

    public void adicionarComentario(Comentario comentario) {
        comentarios.add(comentario);
    }

    @Override
    public void exibir() {
        System.out.println("Postagem [" + id + "] de " + autor.getNomeUsuario() + ": " + conteudo);
        System.out.println("Reações:");
        for (Reacao reacao : reacoes) {
            reacao.exibir();
        }
        System.out.println("Comentários:");
        for (Comentario comentario : comentarios) {
            comentario.exibir();
        }
    }

    @Override
    public Perfil getAutor() {
        return autor;
    }

    // Outros métodos
}

public class Reacao implements Publicavel {
    private String tipoReacao;
    private Postagem postagem;
    private Perfil autor;

    public Reacao(String tipoReacao, Postagem postagem, Perfil autor) {
        this.tipoReacao = tipoReacao;
        this.postagem = postagem;
        this.autor = autor;
        postagem.adicionarReacao(this);
    }

    @Override
    public void exibir() {
        System.out.println("Reação [" + tipoReacao + "] de " + autor.getNomeUsuario() +
                " na postagem " + postagem.getId());
    }

    @Override
    public Perfil getAutor() {
        return autor;
    }

    // Outros métodos
}

public class Comentario implements Publicavel {
    private Postagem postagem;
    private Perfil autor;
    private String conteudo;

    public Comentario(String conteudo, Postagem postagem, Perfil autor) {
        this.conteudo = conteudo;
        this.postagem = postagem;
        this.autor = autor;
        postagem.adicionarComentario(this);
    }

    @Override
    public void exibir() {
        System.out.println("Comentário de " + autor.getNomeUsuario() +
                " em resposta à postagem [" + postagem.getId() + "]: " + conteudo);
    }

    @Override
    public Perfil getAutor() {
        return autor;
    }

    // Outros métodos
}
