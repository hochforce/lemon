<Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onSubmit={handleSubmit}
            form={form}
            ref={formRef}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Por favor, digite seu CPF.' }]}
              value={cpf}
              onChange={event => setCpf(event.target.value)}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="CPF" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Por favor, digite sua senha.' }]}
              value={password}
              onChange={event => setPassword(event.target.value)}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Senha"
              />
            </Form.Item>
            

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Entrar
              </Button>
              Or <a href="/new-participant">Cadastrar Agora!</a>
            </Form.Item>
          </Form>
       