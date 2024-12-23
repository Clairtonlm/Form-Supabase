// Configuração do Supabase
const SUPABASE_URL = 'https://pwgzkpnhsjhtmpbxdyvq.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3Z3prcG5oc2podG1wYnhkeXZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5MTUzMDMsImV4cCI6MjA1MDQ5MTMwM30.v2uAUNo9XFxYlEKMoFKLsQNerICqb6NAi2cMOO8qw78'

// Criar cliente Supabase usando o objeto global correto
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Elementos do DOM
const form = document.getElementById('supabaseForm')
const loading = document.getElementById('loading')
const result = document.getElementById('result')

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    // Mostrar loading
    loading.classList.remove('d-none')
    result.innerHTML = ''
    
    // Coletar dados do formulário
    const formData = {
        id: parseInt(document.getElementById('id').value),
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        idade: parseInt(document.getElementById('idade').value)
    }

    try {
        const { data, error } = await supabase
            .from('users')
            .insert([formData], {
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal'
                }
            })

        if (error) throw error

        result.innerHTML = '<div class="alert alert-success">Usuário cadastrado com sucesso!</div>'
        form.reset()
    } catch (error) {
        result.innerHTML = `<div class="alert alert-danger">Erro ao cadastrar: ${error.message}</div>`
    } finally {
        loading.classList.add('d-none')
    }
})
