use anchor_lang::prelude::*;

declare_id!("HAXm8tfGXEfa7gM8DpofyCknYdmzqzeSVBTAvmLwA4p2");

#[program]
pub mod useless_switch {
    use super::*;

    pub fn init(ctx: Context<Init>) -> Result<()> {
        ctx.accounts.switch.init()
    }

    pub fn toggle(ctx: Context<Toggle>) -> Result<()> {
        ctx.accounts.switch.toggle()
    }
}

#[account]
pub struct Switch {
    state: bool,
}

impl Switch {
    pub fn init(&mut self) -> Result<()> {
        self.state = false;

        Ok(())
    }

    pub fn toggle(&mut self) -> Result<()> {
        self.state = !self.state;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Init<'info> {
    #[account(init, payer = owner, space = 9)]
    pub switch: Account<'info, Switch>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Toggle<'info> {
    #[account(mut)]
    pub switch: Account<'info, Switch>,
    pub user: Signer<'info>,
}
