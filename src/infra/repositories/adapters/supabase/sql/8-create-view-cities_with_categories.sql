/*
Esse código cria uma view que une cidades às suas categorias. Ele faz isso juntando três tabelas:
*/

-- Cria ou substitui uma *view* chamada 'cities_with_categories'
-- Essa *view* será uma tabela virtual que junta as tabelas `cities`, `city_categories` e `categories`
-- com o objetivo de facilitar consultas que envolvam cidades e suas respectivas categorias

create or replace view cities_with_categories as
select
  c.*, -- Seleciona todas as colunas da tabela 'cities'
  cc.id as category_id, -- Pega o ID da categoria e dá o nome de 'category_id'
  cc.name as category_name, -- Pega o nome da categoria e renomeia como 'category_name'
  cc.description as category_description, -- Pega a descrição da categoria como 'category_description'
  cc.code as category_code -- Pega o código da categoria como 'category_code'
from cities c
-- Faz um JOIN entre a tabela 'cities' e a tabela intermediária 'city_categories'
-- onde o ID da cidade deve bater com o campo 'city_id' da tabela 'city_categories'
join city_categories ccl on ccl.city_id = c.id
-- Depois faz outro JOIN com a tabela 'categories'
-- onde o ID da categoria deve bater com o campo 'category_id' da tabela 'city_categories'
join categories cc on cc.id = ccl.category_id;


