--  O PostGIS é uma extensão do PostgreSQL que adiciona funcionalidades geográficas ao banco de dados.
-- Com ele, podemos armazenar pontos geográficos, fazer consultas de distância, calcular áreas, trabalhar com mapas, etc.
CREATE EXTENSION IF NOT EXISTS postgis;
-- O IF NOT EXISTS significa: “Crie somente se ainda não existir.”

-- CITIES
CREATE TABLE cities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  description TEXT NOT NULL,
  location GEOGRAPHY(Point, 4326) -- location GEOGRAPHY(Point, 4326) usa o PostGIS para armazenar latitude e longitude das cidades.
);

-- TOURIST ATTRACTIONS
CREATE TABLE tourist_attractions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  city_id UUID REFERENCES cities ON DELETE CASCADE
  -- ON DELETE CASCADE: O campo city_id está relacionado à tabela cities.
  -- Se você apagar uma cidade, todas as atrações turísticas que têm essa cidade vão ser apagadas automaticamente.
  -- Ex: Cidade: “São Paulo” (id: 123) | Atração: “Avenida Paulista” (city_id: 123)
  -- E você apaga a cidade “São Paulo”, a atração “Avenida Paulista” também será removida automaticamente do banco.
);

-- CATEGORIES
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT  NOT NULL,
  code TEXT NOT NULL
);

-- LINK TABLE: City ⇄ Categories (many-to-many)
CREATE TABLE city_categories (
  city_id UUID REFERENCES cities ON DELETE CASCADE,
  category_id UUID REFERENCES categories ON DELETE CASCADE,
  PRIMARY KEY (city_id, category_id)
);

-- LINK TABLE: City ⇄ City (many-to-many)
CREATE TABLE city_cities (
  city_id UUID REFERENCES cities ON DELETE CASCADE,
  related_city_id UUID REFERENCES cities ON DELETE CASCADE,
  PRIMARY KEY (city_id, related_city_id)
);


-- O PostgreSQL permite criar regras para proteger os dados linha por linha.
-- Mesmo que alguém tenha acesso à tabela, ele só vê os registros permitidos pelas regras de segurança.
-- Enable Row Level Security
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE tourist_attractions ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE city_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE city_cities ENABLE ROW LEVEL SECURITY;


-- Permite que qualquer usuário (TO public)
-- Possa fazer consultas (SELECT) em todas as linhas
-- Porque a condição é USING (true), ou seja, sempre permitido.
-- Create read access policies for all users
CREATE POLICY "Enable read access for all users" ON "public"."cities"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."tourist_attractions"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."categories"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."city_categories"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."city_cities"
AS PERMISSIVE FOR SELECT
TO public
USING (true);