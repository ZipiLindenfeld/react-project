<div id="login" class="ui placeholder segment">
    <form onSubmit={handleSubmit(onSubmit)}>
        <div class="ui one column very relaxed stackable grid">
            <div class="column">
                <div class="ui form">
                    <div class="field">
                        <label>שם משתמש:</label>
                        <div class="ui left icon input">
                            <input placeholder="הכנס שם משתמש"{...register("Username")} />
                            <i class="user icon"></i>
                        </div>
                        <p>{errors.Username?.message}</p>
                    </div>
                    <div class="field">
                        <label>סיסמא:</label>
                        <div class="ui left icon input">
                            <input type="password" placeholder="הכנס סיסמא" {...register("Password")} />
                            <i class="lock icon"></i>
                        </div>
                        <p>{errors.Password?.message}</p>
                    </div>
                    <div class="field">
                        <label>שם:</label>
                        <div class="ui left icon input">
                            <input placeholder="הכנס שם"{...register("Name")} />
                            <i class="user icon"></i>
                        </div>
                        <p>{errors.Name?.message}</p>
                    </div>
                    <div class="field">
                        <label>טלפון:</label>
                        <div class="ui left icon input">
                            <input placeholder="הכנס טלפון" {...register("Phone")} />
                            <i class="lock icon"></i>
                        </div>
                        <p>{errors.Phone?.message}</p>
                    </div>
                    <div class="field">
                        <label>מייל:</label>
                        <div class="ui left icon input">
                        <input placeholder="הכנס מייל"{...register("Email")} />
                            <i class="lock icon"></i>
                        </div>
                        <p>{errors.Email?.message}</p>
                    </div>
                    <div class="field">
                    <label>מספר תעודת זהות:</label>
                        <div class="ui left icon input">
                        <input placeholder="הכנס מספר תעודת זהות" {...register("Tz")} />
                            <i class="lock icon"></i>
                        </div>
                        <p>{errors.Tz?.message}</p>
                    </div>
                    <Button class="ui blue submit button" type="submit">התחברות</Button>
                </div>
            </div>
        </div>
    </form>
</div>