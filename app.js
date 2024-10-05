const express = require("express");
const app = express();
const port = 3000;

// Middleware pour vérifier les heures de travail
const workingHoursMiddleware = (req, res, next) => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send(
      "L'application web est disponible uniquement pendant les heures de travail (du lundi au vendredi, de 9 à 17)."
    );
  }
};

app.use(workingHoursMiddleware);

// Routes
app.get("/", (req, res) => {
  res.send(
    '<h1>Accueil</h1><nav><a href="/">Accueil</a> | <a href="/services">Nos services</a> | <a href="/contact">Nous contacter</a></nav>'
  );
});

app.get("/services", (req, res) => {
  res.send(
    '<h1>Nos services</h1><nav><a href="/">Accueil</a> | <a href="/services">Nos services</a> | <a href="/contact">Nous contacter</a></nav>'
  );
});

app.get("/contact", (req, res) => {
  res.send(
    '<h1>Nous contacter</h1><nav><a href="/">Accueil</a> | <a href="/services">Nos services</a> | <a href="/contact">Nous contacter</a></nav>'
  );
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { title: "Accueil" });
});
