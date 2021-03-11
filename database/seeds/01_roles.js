exports.seed = async function(knex) {
	await knex("roles").insert([
		{ id: 1, name: "basic" },
		{ id: 2, name: "admin" },
	])
}