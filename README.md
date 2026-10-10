# APPS 2026 · Formula UFMG

Site estático do pedal do acelerador (Car #05): modelos 3D interativos do pedal com sensor Hall e com potenciômetro linear, a apresentação da arquitetura e um espaço para um documento PDF.

## Estrutura

```
index.html                  página única com as 4 opções
assets/css/style.css        estilo
assets/js/app.js            navegação, visor de slides e checagem do PDF
assets/img/                 logo e favicon
pedais/pedal-hall.html      modelo interativo do pedal Hall
pedais/pedal-potenciometro.html  modelo interativo do pedal com KPM12J
slides/                     imagens dos 13 slides + o arquivo .pptx
pdf/                        coloque aqui o documento.pdf
```

## Publicar no GitHub Pages

1. Crie um repositório e envie **o conteúdo desta pasta** para a raiz dele (o `index.html` precisa ficar na raiz).
2. No repositório: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, pasta `/ (root)`.
3. Em um ou dois minutos o site fica em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

## Adicionar o PDF

Salve o arquivo como `pdf/documento.pdf` e faça o commit. A opção "Documento PDF" passa a mostrá-lo sozinha. Enquanto o arquivo não existir, a seção mostra um aviso de espaço reservado.

## Testar no computador

Os modelos e os slides abrem com duplo clique no `index.html`, mas a checagem do PDF só funciona servido por HTTP:

```
python -m http.server 8000
```

e abra `http://localhost:8000`.
